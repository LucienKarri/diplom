package com.transportsolution.transportsolution.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.AttachmentEntity;
import com.transportsolution.transportsolution.entity.PostEntity;
import com.transportsolution.transportsolution.model.PostModel;
import com.transportsolution.transportsolution.repository.PostRepository;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class PostService {
    @Autowired
    private PostRepository postRepository;

    private final AttachmentService attachmentService;


    public PostModel create(PostModel postModel) throws Exception {
        if (postModel.getAttachmentId() == null) {
            PostEntity postEntity = PostEntity.builder().title(postModel.getTitle())
                    .paragraph(postModel.getParagraph()).build();

            return PostModel.toModel(postRepository.save(postEntity));
        }
        AttachmentEntity attachmentEntity =
                attachmentService.getAttachment(postModel.getAttachmentId());
        PostEntity postEntity = PostEntity.builder().title(postModel.getTitle())
                .paragraph(postModel.getParagraph()).attachment(attachmentEntity).build();

        return PostModel.toModel(postRepository.save(postEntity));
    }

    public List<PostModel> getPosts(Long id) {
        if (id == null) {
            return postRepository.findAll().stream().map(PostModel::toModel)
                    .collect(Collectors.toList());
        }
        return postRepository.findById(id).stream().map(PostModel::toModel).toList();
    }
}
