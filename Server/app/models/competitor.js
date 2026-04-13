import mongoose from "mongoose";

const competitorSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["Owner", "Competitor"],
            default: "Competitor",
        },

        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
        },

        websiteUrl: {
            type: String,
            required: true,
        },

        domain: {
            type: String,
            required: true,
        },

        analysisData: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// virtual relation
competitorSchema.virtual("pages", {
    ref: "Page",
    localField: "_id",
    foreignField: "competitorId",
});

const Competitor = mongoose.model("Competitor", competitorSchema);
export default Competitor;