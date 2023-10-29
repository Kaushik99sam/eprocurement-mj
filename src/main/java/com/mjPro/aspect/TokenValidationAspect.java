package com.mjPro.aspect;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class TokenValidationAspect {
    @Around("execution(* com.mjPro.controller.*.*(..))")
    public Object checkToken(ProceedingJoinPoint joinPoint) throws Throwable {
        // Your token validation logic goes here
        // Check for the presence and validity of the token
        
        // For example, you can access the HttpServletRequest
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String token = request.getHeader("Authorization");
        
        if (isValidToken(token)) {
            // Token is valid, proceed with the request
            return joinPoint.proceed();
        } else {
        	Object obj = new Object() {
    			private String message = "Invalid Token Authorization";
    			
    			public String getMessage() {
                    return message;
                }
    		};
            // Token is invalid, return a ResponseEntity with an error message and status code
            ResponseEntity<Object> responseEntity = new ResponseEntity<>(obj, HttpStatus.UNAUTHORIZED);
            return responseEntity;
        }
    }
    
    private boolean isValidToken(String token) {
    	return true;
//        return false;
    }
}
