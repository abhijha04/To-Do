window.activeTab='Home';

Vue.component('tasks',{
    props:['array',name],
    template:`
        
        <ul>
            <li v-for="(element,index) in array">
            <div class="checkbox">
            <input type="checkbox" @change="checked" :checked="element.completed" :value="index">
               {{element.taskName}}</div>                
            </li>
        </ul>
    `,

    data:function(){
        return {activeTab:''}
    },

    methods:{
        checked(event){
            this.$emit('check',event);
        }
    }

});

Vue.component('tabs', {
    template: `
    <div>
        <div role="navigation">
            <ul class="nav nav-tabs">
                <li role="presentation" :class="{'active':title.isActive}" v-for="title in titles" @click="changeActive(title)">
                    <a :href="title.href">{{title.name}}</a>
                </li>
            </ul>

        </div>
        <div><slot></slot></div>
    </div>    
    `,

    data: function () {
        return {
            titles:[]
        }
    },

    methods:{
        changeActive:function (title) {
            this.titles.forEach(function (element) {
                element.isActive=(element.name===title.name);
            })
        }
    },

    created(){
        this.titles=this.$children;
    }
});

Vue.component('tab',{
    template:'<div v-show="isActive"><slot></slot></div>',
    props:{
        name:{required:true},
        selected:{default:false}
    },
    data:function () {
        return{
            isActive:false
        }
    },
    computed:{
        href:function () {
            return '#'+this.name.toLowerCase().split(' ').join('-');
        }
    },
    created(){
        this.isActive=this.selected;
    }
});


var app=new Vue({
    el:'#root',
    data:{
        newTask:'',
        tasks:[],
    },

    methods:{
        addTask:function () {
            this.tasks.push(this.taskObject);
        },

        changeState:function (event,array) {
            array[event.target.value].completed=!array[event.target.value].completed;
        },

        show:function () {
            return activeTab;
        }
    },

    computed:{
        taskObject:function () {
            return {taskName:this.newTask,completed:false}
        },
        completedTasks:function () {
            return this.tasks.filter(function (task) {
                return task.completed;
            })
        },

        incompleteTasks:function(){
            return this.tasks.filter(function (task) {
                return !task.completed;
            })
        },



    }

});

