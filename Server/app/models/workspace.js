import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

workspaceSchema.virtual('competitors', {
    ref: 'Competitor',
    localField: '_id',
    foreignField: 'workspaceId',
});

const Workspace = mongoose.model('Workspace', workspaceSchema);
export default Workspace;