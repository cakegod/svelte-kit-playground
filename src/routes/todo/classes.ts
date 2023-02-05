export class Task {
	name: string;
	description: string;
	done: boolean;
	id: string;
	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
		this.done = false;
		this.id = crypto.randomUUID();
	}
}

export class Project {
	name: string;
	tasks: Task[];
	id: string;
	constructor(name: string) {
		this.name = name;
		this.tasks = [];
		this.id = crypto.randomUUID();
	}

	addTask(name: string, content: string) {
		this.tasks = [...this.tasks, new Task(name, content)];
	}

	deleteTask(taskID: string) {
		this.tasks = this.tasks.filter((task) => task.id !== taskID);
	}
}

export class Todo {
	projects: Project[];

	constructor() {
		this.projects = [];
		this.addProject('default project');
		this.projects[0].addTask('default task', 'something...');
		this.projects[0].addTask('default task 2', 'something...');
	}

	addProject(name: string) {
		this.projects.push(new Project(name));
	}

	deleteProject(projectID: string) {
		this.projects = this.projects.filter((project) => project.id !== projectID);
	}
}
