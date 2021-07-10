import mongoose from 'mongoose';

const relationSchema = mongoose.Schema({
    id : {
        type: String
    },
    user1Id: {
        type: String,
    },
    userName1: {
        type: String
    },
    relationType: {
        type: String
    },
    user2Id: {
        type: String,
    },
    userName2: {
        type: String
    },
});

const Relation = mongoose.model('Relation', relationSchema);
export default Relation; 