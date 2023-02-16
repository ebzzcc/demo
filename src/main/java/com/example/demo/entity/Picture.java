package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 图片实体
 */
@TableName("t_picture")
@Data
public class Picture {
    @TableId
    private Integer pid; // 图片编号

    private String pname; // 图片名称

    private String filePath; // 图片路径

    private boolean isTrue;//识别结果是否正确

    private boolean isSave;//照片是否已经保存
}
