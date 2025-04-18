import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProjectSchema = new Schema(
    {
        ProjectName: {
            type: String,
            required: true,
        },
        Location: {
            type: String,
            required: true,
        },
        Location: {
            type: String,
            required: true,
        },
        StartDate: {
            type: String,
            required: true,
        },
        EndDate: {
            type: String,
            required: true,
        },
        TotalUnits: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Ongoing', 'Completed', 'Upcoming'],
        },
    },
    { timestamps: true }
);

const Project = model('Project', ProjectSchema);

export default Project;
