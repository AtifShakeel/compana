import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },

        competitorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competitor",
            required: true,
        },

        analysisData: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },

        scanStatus: {
            type: String,
            enum: ["Pending", "In Progress", "Completed", "Failed"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

// virtual populate
pageSchema.virtual("competitor", {
    ref: "Competitor",
    localField: "competitorId",
    foreignField: "_id",
    justOne: true,
});

// computed field
pageSchema.virtual("analysis").get(function () {
    return {
        analysis: this.analysisData,
        status: this.scanStatus,
        lastUpdated: this.updatedAt,
    };
});

const Page = mongoose.model("Page", pageSchema);
export default Page;