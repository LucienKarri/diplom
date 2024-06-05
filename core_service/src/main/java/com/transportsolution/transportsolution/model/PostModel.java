package com.transportsolution.transportsolution.model;

import java.util.List;
import com.transportsolution.transportsolution.entity.PostEntity;
import lombok.Data;

@Data
public class PostModel {

    private String title;
    private List<String> paragraph;
    private String attachmentId;

    public static PostModel toModel(PostEntity postEntity) {
        PostModel model = new PostModel();
        model.setTitle(postEntity.getTitle());
        model.setParagraph(postEntity.getParagraph());
        // if (postEntity.getAttachment() != null) {
        // model.setAttachmentId(postEntity.getAttachment().getId());
        // }
        return model;
    }
}
