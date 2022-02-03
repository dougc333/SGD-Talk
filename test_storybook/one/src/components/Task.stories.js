
import React from 'react'
import Task from './Task.js'

export default{
  component:Task,
  title:Task,
}

const Template = args=>(< Task {...args}/>)

export const Default = Template.bind(())

export const Default = Template.bind({})

Default.args = {
  task:{
    id:'1',
    title:"test title',
    state:"TASK_INBOX",
    updatedAt: new Date(2022,0,1,9,0),
  },
};

const const Pinned = Template.bind({})
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
};



