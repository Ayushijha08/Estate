import Project from "../Models/Project.js";

export const createProject = async (req, res) => {
    try {
        const { ProjectName, Location, StartDate, EndDate, TotalUnits, status} = req.body;
        if (!ProjectName || !Location|| ! StartDate|| ! EndDate|| ! TotalUnits|| ! status )   {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Project.create({ ProjectName, Location, StartDate, EndDate, TotalUnits, status}) 
        res.status(201).json({
           success:true,
            message: 'Project created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Project', details: error.message });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const Projects = await Project.find();
        res.json(Projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getProjectById = async (req, res) => {
    try {
        const ProjectId = req.params.id;
        const Project = await Project.findById(ProjectId);
        if (!Project) {
            return res.status(404).json({ message: 'Project id not found' });
        }
        res.json(Project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { ProjectName, Location, StartDate, EndDate, TotalUnits, status} = req.body;
        const ProjectId = req.params.id; 

        const existingProject = await Project.findById(ProjectId);
        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const updateData = {
            ProjectName, Location, StartDate, EndDate, TotalUnits, status
        };

        const updatedProject = await Project.findByIdAndUpdate(
            ProjectId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,

            message: 'Project updated successfully',
            Project: updatedProject
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the Project', details: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const ProjectId = req.params.id; 
        const deletedProject = await Project.findByIdAndDelete(ProjectId); 
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ 
            success:true,
            message: 'Project deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};