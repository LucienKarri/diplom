package com.transportsolution.transportsolution.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.transportsolution.transportsolution.model.PostModel;
import com.transportsolution.transportsolution.service.PostService;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public PostModel creaPostEntity(@RequestBody PostModel postModel) throws Exception {
        return postService.create(postModel);
    }

    @GetMapping
    public List<PostModel> getPostEntity(@RequestParam(required = false) Long id) {
        return postService.getPosts(id);
    }
}
