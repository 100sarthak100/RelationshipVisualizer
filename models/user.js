import mongoose from 'mongoose';

// TODO
// const relationSchema = mongoose.Schema({
//     // id : {
//     //     type: String
//     // },
//     relationType: {
//         type: String
//     },
//     withUserId: {
//       type: String,
//     }
// });

const userSchema = mongoose.Schema({
    id : {
        type: String
    },
    name: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
export default User; 
