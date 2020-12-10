package com.aits.yb.aits_yb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.aits.yb")
public class AitsYbApplication {

	public static void main(String[] args) {
		SpringApplication.run(AitsYbApplication.class, args);
	}

}
