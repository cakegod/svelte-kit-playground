<script lang="ts">
	interface Task {
		name: string;
		description: string;
		done: boolean;
	}

	interface Project {
		name: string;
		tasks: string[];
	}

	interface Todo {
		projects: { [key: string]: Project };
		tasks: { [key: string]: Task };
	}

	const firstTaskId = crypto.randomUUID();
	const secondTaskId = crypto.randomUUID();

	const todo: Todo = {
		projects: {
			[crypto.randomUUID()]: {
				name: 'Default project',
				tasks: [firstTaskId, secondTaskId]
			}
		},
		tasks: {
			[firstTaskId]: { name: 'First Task', description: 'some description...', done: false },
			[secondTaskId]: { name: 'Second Task', description: 'some description...', done: false }
		}
	};
</script>
