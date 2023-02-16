package com.example.demo.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.History;
import com.example.demo.mapper.HistoryMapper;
import com.example.demo.service.IHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 图片Service实现类
 */
@Service("historyService")
public class IHistoryServiceImpl extends ServiceImpl<HistoryMapper, History> implements IHistoryService{

    @Autowired
    private HistoryMapper historyMapper;
}

