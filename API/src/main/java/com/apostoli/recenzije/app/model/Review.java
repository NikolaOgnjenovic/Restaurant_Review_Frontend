package com.apostoli.recenzije.app.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    private String description;
    @Column(columnDefinition = "integer default 0")
    private int likes;
    @Column(columnDefinition = "integer default 0")
    private int dislikes;
    private int foodCost;
    private Long userId;
    private ArrayList<Long> likedBy;
    private ArrayList<Long> dislikedBy;
}