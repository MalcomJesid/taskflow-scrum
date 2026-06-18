package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAll() {
        return todoRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Todo> getByStatus(boolean completed) {
        return todoRepository.findByCompletedOrderByCreatedAtDesc(completed);
    }

    public Todo getById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo no encontrado con id: " + id));
    }

    public Todo create(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo update(Long id, Todo updated) {
        Todo existing = getById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setCompleted(updated.isCompleted());
        return todoRepository.save(existing);
    }

    public void delete(Long id) {
        todoRepository.deleteById(id);
    }

    public Todo toggleCompleted(Long id) {
        Todo todo = getById(id);
        todo.setCompleted(!todo.isCompleted());
        return todoRepository.save(todo);
    }
}
