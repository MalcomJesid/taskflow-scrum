package com.todo.repository;

import com.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByOrderByCreatedAtDesc();
    List<Todo> findByCompletedOrderByCreatedAtDesc(boolean completed);
    List<Todo> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<Todo> findByUserIdAndCompletedOrderByCreatedAtDesc(UUID userId, boolean completed);
    Optional<Todo> findByIdAndUserId(Long id, UUID userId);
}
