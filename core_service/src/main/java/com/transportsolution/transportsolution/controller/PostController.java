package com.transportsolution.transportsolution.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.transportsolution.transportsolution.entity.PostEntity;
import com.transportsolution.transportsolution.model.PostModel;
import com.transportsolution.transportsolution.service.PostService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @PostMapping
    public PostModel creaPostEntity(@RequestBody PostModel postModel) throws Exception {
        return postService.create(postModel);
    }

    @GetMapping
    public List<PostEntity> getPostEntity(@RequestParam(value = "id", required = false) Long id) {
        log.info("MMMMMM");
        return postService.getPosts(id);
    }
}
