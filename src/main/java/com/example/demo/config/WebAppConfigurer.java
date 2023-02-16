package com.example.demo.config;


import com.example.demo.interceptor.SysInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebAppConfigurer implements WebMvcConfigurer  {
    //跨域问题
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowCredentials(true)
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE","OPTIONS")
                .maxAge(3600);
    }
    //本地资源映射
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String root="E:/Desktop/graduate";
        registry.addResourceHandler("/picture/**").addResourceLocations("file:"+root+"/picture/");
    }

//  //实现拦截
//    @Bean
//    public SysInterceptor sysInterceptor(){
//        return new SysInterceptor();
//    }
// //拦截规则
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        String[] patterns=new String[]{"/adminLogin","/product/**","/bigType/**","/user/wxlogin","/weixinpay/**"};
//        registry.addInterceptor(sysInterceptor())
//                .addPathPatterns("/**")
//                .excludePathPatterns(patterns);
//    }
}
