import mongoose from 'mongoose';
import User from '../models/user.js';
import Relation from '../models/relation.js';

// Get all added relations
export const getAllRelations = async (req, res) => {
    try {
        const relations = await Relation.find();
        res.status(200).json(relations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a relation
export const createRelation = async (req, res) => {
    const data = req.body;

    const userId1 = data.user1Id;
    if (!mongoose.Types.ObjectId.isValid(userId1)) return res.status(404).send(`No user with id: ${userId1}`);

    const userId2 = data.user2Id;
    if (!mongoose.Types.ObjectId.isValid(userId2)) return res.status(404).send(`No user with id: ${userId2}`);
 
    const relation = new Relation({
        user1Id: userId1,
        userName1: data.userName1,
        relationType: data.relationType,
        user2Id: userId2,
        userName2: data.userName2
    });

    try {
        await relation.save();
        res.status(201).json(relation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete relation
export const deleteRelation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No relation with id: ${id}`);

    await Relation.findByIdAndDelete(id);

    res.json({ message: 'Relation deleted successfully' });
}

// DFS (Depth First Search) algorithm function
function dfs(u, v, visited, path, G, ret){
    visited.set(u.uname, 1);

    if(u.uid === v.uid)
    {
        let temp = [];
        for(let i=0; i<path.length; i++)
        {
            temp.push(path[i].uname);
        }
        ret.push(temp);
    }
    else
    {
        for(let i=0; i<G.get(u.uid).length; i++)
        {
            let y1 = G.get(u.uid)[i].uid;
            let y2 = G.get(u.uid)[i].uname;

            if(visited.get(y2) == 0)
            {
                path.push({ uid: y1, uname: y2 });
                dfs({ uid: y1, uname: y2 }, v, visited, path, G, ret);
                path.pop();
            }
        }
    }
    visited.set(u.uname, 0);
}

// Get relation between 2 users
export const getRelation = async (req, res) => {
    const data = req.body;
    
    const userId1 = data.user1Id;
    if (!mongoose.Types.ObjectId.isValid(userId1)) return res.status(404).send(`No user with id: ${userId1}`);

    const userId2 = data.user2Id;
    if (!mongoose.Types.ObjectId.isValid(userId2)) return res.status(404).send(`No user with id: ${userId2}`);

    try {
        const relations = await Relation.find();
        const users = await User.find();
    
        // Find path between userId1 and userId2
        const V = await relations.length;
        let G = new Map();
        for (var i = 0; i < users.length; i++) {
            G.set(users[i]._id.toString(), []);
        }

        for(let i=0; i<relations.length; i++)
        {
            let u1 = relations[i].user1Id;
            let n1 = relations[i].userName1;
            let u2 = relations[i].user2Id;
            let n2 = relations[i].userName2;
            G.get(u1).push({uid: u2, uname: n2});
            G.get(u2).push({uid: u1, uname: n1});
        }

        // console.log(G);

        let n = 1000;
        let visited = new Map();
        for(let i=0; i<users.length; i++)
        {
            visited.set(users[i].name.toString(), 0);
        }

        let path = [];
        let u = { uid: userId1, uname: data.userName1};
        let v = { uid: userId2, uname: data.userName2};
        path.push(u);
        
        let ret = [];
        dfs(u, v, visited, path, G, ret);
        // console.log(ret);

        res.status(200).json(ret);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
