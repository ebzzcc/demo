package com.example.demo.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.demo.entity.History;
import com.example.demo.entity.Picture;
import com.example.demo.entity.R;
import com.example.demo.service.IHistoryService;
import com.example.demo.service.IPictureService;
import com.example.demo.util.JwtUtils;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/my/history")
public class HistoryController {

    @Autowired
    private IPictureService pictureService;
    @Autowired
    private IHistoryService historyService;
    /**
     * 保存识别结果
     * @param
     * @return
     */
    @RequestMapping("/confirmSave")
    public R confirmSave(@RequestBody History history,@RequestHeader(value = "token")String token){
        System.out.println("token="+token);
        System.out.println("history="+history);
        Map<String,Object> resultMap=new HashMap<>();
        // 添加历史记录到数据库
        Claims claims = JwtUtils.validateJWT(token).getClaims();
        if(claims!=null){
            System.out.println("openid="+claims.getId());
            History resultHistory=historyService.getOne(new QueryWrapper<History>().eq("pname",history.getPname()));
            if(resultHistory==null){
                resultMap.put("flag",1);
                history.setOpenId(claims.getId());
                history.setCreateDate(new Date());
                historyService.save(history);
                //修改照片保存信息
                Picture picture =pictureService.getOne(new QueryWrapper<Picture>().eq("pname",history.getPname()));
                picture.setSave(true);
                pictureService.updateById(picture);
            }
            else {
                resultMap.put("flag",0);
            }

        }
        return R.ok(resultMap);
    }

    /**
     * 历史记录查询
     * @param
     * @return
     */
    @RequestMapping("/list")
    public R list(@RequestHeader(value = "token")String token,Integer page,Integer pageSize){
        System.out.println("token="+token);
        System.out.println("page="+page);
        System.out.println("pageSize="+pageSize);
        Claims claims = JwtUtils.validateJWT(token).getClaims();
//        Page<History> pageHistory=new Page<>(page,pageSize);
//        Page<History> historyResults=historyService.page()

        Map<String,Object> resultMap=new HashMap<>();
        List<History> historyList=null;
        historyList=historyService.list(new QueryWrapper<History>().eq("openId",claims.getId()).orderByAsc("id"));
        resultMap.put("historyList",historyList);
        return R.ok(resultMap);
    }
}
