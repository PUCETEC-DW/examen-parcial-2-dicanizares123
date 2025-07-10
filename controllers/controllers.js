import tareas from "../models/tarea.js";

const getAllTasks = (req, res) => {
  res.status(200).json(tareas);
};

const createTask = (req, res) => {
  let { id, title, description, completed, priority } = req.body;
  let tareaExistente = tareas.find((t) => t.id === id);

  if (priority < 1 || priority > 5) {
    return res
      .status(400)
      .json({ message: "La prioridad debe estar entre 1 y 5." });
  }

  if (!title) {
    return res
      .status(400)
      .json({ message: "El título de la tarea es obligatorio." });
  }
  if (tareaExistente) {
    return res.status(400).json({ message: "El id de tarea ya existe" });
  }

  const nuevaTarea = {
    id,
    title,
    description,
    completed: completed || false,
    priority,
  };
  tareas.push(nuevaTarea);

  res.status(201).json(nuevaTarea);
};

const updateTask = (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;
  const findTask = tareas.findIndex((t) => t.id === id);
  if (findTask === -1) {
    return res.status(404);
  }

  tareas[findTask] = { ...tareas[findTask], ...updates };
  res.status(200).json(tareas[findTask]);
};

const deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const tareaExistente = tareas.find((t) => t.id === id);
  if (!tareaExistente) {
    return res.status(404);
  }
  tareas.splice(tareaExistente, 1);
  res.status(200).json(tareas);
};

const getAdvancedStats = (req, res) => {
  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter((t) => t.completed === true).length;
  const promedioTareas =
    tareas.reduce((sum, tarea) => sum + tarea.priority, 0) / totalTareas;
  if (totalTareas === 0) {
    return res.status(400).json({ message: "No hay tareas" });
  }
  res.status(200).json({
    total: totalTareas,
    completed: tareasCompletadas,
    averagePriority: promedioTareas,
  });
};

export default {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getAdvancedStats,
};
