package com.example.demo.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Picture;
import com.example.demo.mapper.PictureMapper;
import com.example.demo.service.IPictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 图片Service实现类
 */
@Service("pictureService")
public class IPictureServiceImpl extends ServiceImpl<PictureMapper, Picture> implements IPictureService{

    @Autowired
    private PictureMapper pictureMapper;
}

