import app from app 

app.get('tasks/') 
app.post('tasks/{id}') 
app.patch('tasks/task/{}') 
app.delete('tasks/{id}')


export default app