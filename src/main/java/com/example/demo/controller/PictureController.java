package com.example.demo.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.entity.Picture;
import com.example.demo.entity.R;
import com.example.demo.service.IPictureService;
import com.example.demo.util.DateUtil;
import com.example.demo.util.OcrUtils;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/picture")
public class PictureController {
    @Autowired
    private IPictureService pictureService;
    @Value("${filePath}")
    private String filePath;

    /**
     * 识别图片
     */
    @RequestMapping("/handleImg")
    public Map<String,Object> handleImg(@RequestParam("uploadPicture") MultipartFile file) throws TesseractException, IOException {
        Map<String,Object> resultMap=OcrUtils.recognizeResult(file);
        Picture picture=new Picture();
        picture.setPname((String) resultMap.get("pname"));
        picture.setFilePath((String) resultMap.get("filePath"));
        picture.setTrue(true);
        picture.setSave(false);
        pictureService.save(picture);
        return resultMap;
    }
}
