const { ipcMain } = require('electron');
const { Project } = require('../../store/models/project/project-model');

class ProjectService {
    constructor() {}

    handle() {
        this.addProject();
        this.getProject();
    }

    addProject() {
        ipcMain.handle('add-project', async (event, project) => {
            try {
                await Project.create(project);
                return { status: 'success', message: `Projet ${project.name} ajouté !` };
            } catch (err) {
                return this.errorStatus(err.stack);
            }
        });
    }

    getProject() {
        ipcMain.handle('get-project', async (event, project) => {
            try {
                const projects = await Project.findAll({ raw: true });
                return { status: 'success', projects: projects };
            } catch (err) {
                return this.errorStatus(err.stack);
            }
        });
    }

    errorStatus(message) {
        if (message.startsWith('SequelizeUniqueConstraintError')) return { status: 'error', message: 'Le project existe deja' };

        return { status: 'error', message: 'Erreur' };
    }
}

module.exports = ProjectService;
