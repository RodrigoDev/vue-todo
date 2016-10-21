<template>
    <div id="todo" class="container">
        <h1>To-do List</h1>
        <section class="panel">
            <input type="checkbox" id="mark-all" v-bind:checked="areAllSelected" v-on:click="selectAll">
            <input type="text" placeholder="What to do?" autofocus class="text-input" v-model="title" v-on:keyup.enter="addTask">
            <button v-on:click="clearList">Clear List</button>
        </section>

        <ul class="list">
            <li v-for="task in taskList" v-bind:class="{done: task.completed}">
                <input type="checkbox" class="checkbox" v-model="task.completed">
                <label for="checkbox">{{ task.title }}</label>
                <button class="delete" v-on:click="removeTask(task)">X</button>
            </li>
        </ul>
        <pre>{{$data}}</pre>
    </div>
</template>

<script>
    export default {
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData()
        },
        computed: {
            areAllSelected: function() {
                //Check if every checked property returns true and if there is at least one todo item
                return this.taskList.every(function(task) {
                    return task.completed
                }) && this.taskList.length > 0
            }
        },
        data() {
            return {
                root: 'https://jsonplaceholder.typicode.com/todos/',
                title: '',
                taskList: [],
                taskListCompleted: [],
                newTask: {
                    title: '',
                    userId: 0,
                    completed: false
                }
            }
        },
        methods: {
            fetchData() {
                this.$http.get(this.root).then((response) => {
                    this.taskList = response.body
                })
            },

            addTask: function() {
                //trim() is used to remove whitespace from both ends of a string
                var task = _.clone(this.newTask)
                task.title = this.title.trim()
                    //if task is not an empty string
                if (task) {
                    //Push an object containing the task to the taskList array
                    this.$http.post(this.root, task, {
                        emulateJSON: true
                    }).then((response) => {
                        this.taskList.push(task)
                    }, (response) => {
                        console.log("error")
                    })
                    this.title = ""
                }
            },

            removeTask: function(task) {
                this.$http.delete(this.root + task.id).then((response) => {
                    this.taskList.splice(this.taskList.indexOf(task), 1)
                }, (response) => {
                    // error callback
                    console.log("error")
                })

            },

            clearList: function() {
                //Setting taskList to an empty array clears the whole list
                this.taskList = []
            },

            selectAll: function(task) {
                //targetValue is set to the opposite of areAllSelected
                var targetValue = this.areAllSelected ? false : true;
                //we use a for loop to set the checked state of all items to the target value
                for (var i = 0; i < this.taskList.length; i++) {
                    this.taskList[i].completed = targetValue
                }
            }
        },
        components: {}
    }
</script>

<style>
    /* Relevant resets */
    /* Reset the default browser styles on list items */
    
    ul,
    li {
        margin: 0;
        padding: 0;
        border: 0;
    }
    /* Global Styles */
    
    body {
        line-height: 1;
        font-family: "Lato", sans-serif;
        background-color: #EFF1F2;
    }
    
    .container {
        width: 70%;
        margin: 1em auto 3em;
        border: 1px solid #efefef;
    }
    
    .panel,
    li {
        /* Use flexbox */
        display: flex;
        /* Center everything inside .panel and li vertically */
        align-items: center;
        /* Distribute space evenly between the contents*/
        justify-content: space-between;
        list-style-type: none;
        padding: 10px;
        border-bottom: 1px solid #efefef;
        background-color: #E7E8EB;
    }
    
    .text-input {
        border: 1px solid #dedede;
        padding-left: 10px;
        width: 70%;
        height: 35px;
        color: #555;
    }
    
    button {
        color: #555;
        background-color: #FFFFFF;
        border: 1px solid #bbb;
        outline: 0;
        width: 100px;
        height: 38px;
        cursor: pointer;
        font-size: 14px;
    }
    /* Task  area */
    
    .list li {
        background-color: #3465A4;
    }
    
    .list li .delete {
        background-color: transparent;
        border: 1px solid #3465A4;
        color: #ddd;
        /* Hide the delete button by default*/
        visibility: hidden;
        font-size: 20px;
        font-weight: bold;
    }
    
    .list li:hover>.delete {
        /* Show the delete button when hovering over each list item */
        visibility: visible;
    }
    
    .list label {
        padding-right: 10px;
        display: inline-block;
        width: 70%;
        font-size: 18px;
        line-height: 24px;
        color: #fcfcfc;
        z-index: 2;
        overflow: hidden;
    }
    
    .list li.done label {
        color: #d9d9d9;
        text-decoration: line-through;
    }
    /* Media Queries */
    
    @media screen and (max-width: 768px) {
        .container {
            width: 90%;
            max-width: 90%;
        }
        button {
            width: 80px;
        }
    }
</style>