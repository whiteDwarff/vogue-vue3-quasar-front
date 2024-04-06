<template>
	<q-card 
	class="q-mx-auto"
	style="width: 50%">
	
		<q-card-section class="q-gutter-y-md">
			<q-card-header class="text-center	">
				<div class="text-center">
					user {{ $route.params.id }}
				</div>
			</q-card-header>
			<q-input
				v-model="form.email"
				color="teal"
				label="email"
				outlined
				dense
			>
				<template v-if="form.email" v-slot:append>
					<q-icon
						@click.prevent="form.email = ''"
						color="gray-6"
						size="14px"
						name="cancel"
						class="cursor-pointer" 
					/>
				</template>
			</q-input>
			<q-input
				v-model="form.password"
				color="teal"
				label="password"
				type="password"
				outlined
				dense
			>
				<template v-if="form.password" v-slot:append>
					<q-icon
						@click.prevent="form.password = ''"
						color="gray-6"
						size="14px"
						name="cancel"
						class="cursor-pointer" 
					/>
				</template>
			</q-input>
			<q-btn 
				class="full-width"
				color="primary"
				label="제출"
				dense
				unelevated 
			/>
		</q-card-section>
	</q-card>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
    email: '',
    password: '',
})


</script>

<style>
</style>