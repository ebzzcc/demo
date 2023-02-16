package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import java.util.Date;

@TableName("t_history")
@Data
public class History {

    private Integer id; // 历史记录编号

    private String pname; // 图片名称

    private String openId; // 用户编号

    @JsonSerialize(using=CustomDateTimeSerializer.class)
    private Date createDate; // 注册日期

    private String ocrResult;

    private String pNickName; // 图片名称
}
