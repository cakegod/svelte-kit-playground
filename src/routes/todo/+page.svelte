<script lang="ts">
	import { Todo } from './classes';
	import { slide } from 'svelte/transition';

	let todo = new Todo();
	let isAddingTask = false;
	let taskName = '';
	let taskContent = '';
</script>

{#each todo.projects as project (project.id)}
	<div class="flex w-full max-w-xs flex-col gap-4">
		<h2 class="self-center pb-8 text-2xl font-bold">{project.name}</h2>
		{#each project.tasks as task (task.id)}
			<div
				transition:slide
				class="card card-compact grow bg-base-300 shadow"
				class:bg-success={task.done}
				class:bg-warning={!task.done}
			>
				<div class="card-body">
					<button
						on:click={() => {
							project.deleteTask(task.id);
							todo = todo;
						}}
						type="button"
						class="btn-error btn-xs btn w-6 self-end">x</button
					>
					<h3 class="card-title">{task.name}</h3>
					<p>{task.description}</p>
					<div class="card-actions justify-end">
						<button
							on:click={() => (task.done = !task.done)}
							class="btn-sm btn"
							class:btn-success={task.done}
							class:btn-warning={!task.done}
						>
							{task.done ? 'Done!' : 'Todo'}
						</button>
					</div>
				</div>
			</div>
		{/each}
		{#if isAddingTask}
			<form
				transition:slide
				on:submit={() => {
					project.addTask(taskName, taskContent);
					todo = todo;
				}}
				class="form-control rounded-box bg-base-300 p-4 shadow"
			>
				<button
					on:click={() => (isAddingTask = false)}
					type="button"
					class="btn-error btn-xs btn w-6 self-end">x</button
				>
				<label class="form-control label items-start">
					Task Name
					<input required bind:value={taskName} class="input w-full" type="text" />
				</label>
				<label class="form-control label items-start">
					Task Content
					<textarea required bind:value={taskContent} class="textarea w-full" />
				</label>
				<button class="btn-success btn" type="submit">Add task</button>
			</form>
		{:else}
			<button on:click={() => (isAddingTask = true)} class="btn-info btn"> + Add new task </button>
		{/if}
	</div>
{/each}

<style lang="postcss">
	.bg-success {
		@apply bg-success/5;
	}
	.bg-warning {
		@apply bg-warning/5;
	}
</style>
