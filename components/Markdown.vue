<template lang="md">
    <div class="markdown-body" >
        {{markdown}}
    </div>

    <div v-html="markdown" >
       
    </div>

</template>

<script>

export default {
    name: 'Markdown',
    props:{
        markdown:String
    },
    data: () => ({
      
    }),

};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css');
.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>
