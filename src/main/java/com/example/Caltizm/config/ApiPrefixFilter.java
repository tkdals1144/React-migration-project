package com.example.Caltizm.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class ApiPrefixFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;

        String path = req.getRequestURI();
        if (path.startsWith("/api")) {
            String newPath = path.replaceFirst("/api", "");
            HttpServletRequestWrapper wrappedRequest = new HttpServletRequestWrapper(req) {
                @Override
                public String getRequestURI() {
                    return newPath;
                }

                @Override
                public String getServletPath() {
                    return newPath;
                }
            };
            chain.doFilter(wrappedRequest, response);
            return;
        }

        chain.doFilter(request, response);
    }
}