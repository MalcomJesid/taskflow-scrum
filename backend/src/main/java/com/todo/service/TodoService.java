package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllByUser(UUID userId) {
        return todoRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Todo> getByStatusForUser(boolean completed, UUID userId) {
        return todoRepository.findByUserIdAndCompletedOrderByCreatedAtDesc(userId, completed);
    }

    public Todo createForUser(Todo todo, UUID userId) {
        todo.setUserId(userId);
        todo.setId(null);
        return todoRepository.save(todo);
    }

    public Todo updateForUser(Long id, Todo data, UUID userId) {
        Todo existing = todoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new NoSuchElementException("No encontrada"));
        existing.setTitle(data.getTitle());
        existing.setDescription(data.getDescription());
        existing.setCompleted(data.isCompleted());
        return todoRepository.save(existing);
    }

    public Todo toggleForUser(Long id, UUID userId) {
        Todo existing = todoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new NoSuchElementException("No encontrada"));
        existing.setCompleted(!existing.isCompleted());
        return todoRepository.save(existing);
    }

    public void deleteForUser(Long id, UUID userId) {
        Todo existing = todoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new NoSuchElementException("No encontrada"));
        todoRepository.delete(existing);
    }
}
