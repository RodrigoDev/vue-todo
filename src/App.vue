<template>
  <div id="app">
    <h1>To-do List</h1>
    <input type="text" v-model="title" v-on:keyup.enter="addTodo()">
    <ul>
        <li v-for="(item, index) in todoList" class="notCompleted">
            <span>{{item.title}}</span>
            <button v-on:click="removeTodo(index)">X</button>
        </li>
    </ul>
    </hr>
    <ul>
        <li v-for="(item, index) in todoListCompleted" class="completed">
            <span>{{item.title}}</span>
            <button v-on:click="removeTodo(index)">X</button>
        </li>
    </ul>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                root: 'https://jsonplaceholder.typicode.com',
                title: '',
                todoList: [],
                todoListCompleted: [],
                todo: {
                    title: '',
                    userId: 0,
                    completed: false
                }
            }
        },
        methods: {
            fetchData() {
                this.$http.get(this.root + '/todos').then((response) => {
                    this.todoListCompleted = response.body.filter(
                        function(item) {
                            return item.completed === true
                        }
                    )
                    this.todoList = response.body.filter(
                        function(item) {
                            return item.completed === false
                        }
                    )
                });
            },
            addTodo() {
                this.todoList.push({
                    title: this.title
                })
                this.title = ''
            },
            removeTodo(index) {
                this.todoListCompleted.push(this.todoList.splice(index, 1)[0])
            }
        },
        components: {},
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData()
        },
    }
</script>

<style>
    .completed {
        pointer-events: none;
        opacity: 0.4;
    }
</style>