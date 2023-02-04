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
	const thirdTask = crypto.randomUUID();

	const todo: Todo = {
		projects: {
			[crypto.randomUUID()]: {
				name: 'Default project',
				tasks: [firstTaskId, secondTaskId]
			},
			[crypto.randomUUID()]: {
				name: 'Default project Two',
				tasks: [thirdTask]
			}
		},
		tasks: {
			[firstTaskId]: { name: 'First Task', description: 'some description...', done: false },
			[secondTaskId]: { name: 'Second Task', description: 'some description...', done: false },
			[thirdTask]: { name: 'Third Task', description: 'some description...', done: false }
		}
	};
</script>

{#each Object.entries(todo.projects) as [projectID, project]}
	<div class="mb-8">
		<h2 class="text-2xl font-bold">{project.name}</h2>
		{#each Object.entries(todo.tasks) as [taskID, task]}
			{#if project.tasks.includes(taskID)}
				<div
					class:bg-completed={task.done}
					class:bg-uncompleted={!task.done}
					class="card w-96 bg-base-100 shadow"
				>
					<div class="card-body">
						<h2 class="card-title">{task.name}</h2>
						<p>{task.description}</p>
						<div class="card-actions justify-end">
							<button
								on:click={() => (task.done = !task.done)}
								class="btn"
								class:btn-success={task.done}
								class:btn-error={!task.done}
							>
								{task.done ? 'Completed' : 'To be done'}
							</button>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
{/each}

<style lang="postcss">
	.bg-completed {
		@apply bg-success/5;
	}
	.bg-uncompleted {
		@apply bg-error/5;
	}
</style>
