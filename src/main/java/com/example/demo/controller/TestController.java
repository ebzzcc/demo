package com.example.demo.controller;
import com.example.demo.entity.R;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/java1234")
public class TestController {

    /**
     * 测试
     * @return
     */
    @GetMapping("/test")
    public R test(){
        return R.ok("流弊java1234");
    }
}
