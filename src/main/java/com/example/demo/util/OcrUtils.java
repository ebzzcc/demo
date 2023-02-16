package com.example.demo.util;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class OcrUtils {
    public static Map<String,Object> recognizeResult(MultipartFile file) throws IOException, TesseractException {
        String filePath="E:/Desktop/graduate/picture/";
        String dataPath="E:/Desktop/graduate/jTessBoxEditorFX/tesseract-ocr/tessdata";
        Map<String,Object> resultMap=new HashMap<>();
        if(!file.isEmpty()){
            String originalFilename = file.getOriginalFilename();
            String suffixName=originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFileName= DateUtil.getCurrentDateStr()+suffixName;
            resultMap.put("pname",newFileName);
            resultMap.put("filePath",filePath+newFileName);
            System.out.println(resultMap);
            File fileDir = new File("E:/Desktop/graduate/picture");
            if(!fileDir.exists()) {
                //如果没有目录应该创建目录
                fileDir.mkdirs();
            }
            //文件实现上传
            file.transferTo(new File(filePath+newFileName));
            ITesseract instance = new Tesseract();
            instance.setDatapath(dataPath);
            instance.setLanguage("testlang+chi_sim");//选择字库文件（只需要文件名，不需要后缀名）
            String ocrResult = instance.doOCR(new File(filePath+newFileName));//开始识别
            resultMap.put("code",0);
            resultMap.put("msg","识别成功");
            resultMap.put("ocrResult",ocrResult);
        }
        return resultMap;
    }
}
