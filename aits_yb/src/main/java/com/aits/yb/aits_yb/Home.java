package com.aits.yb.aits_yb;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Home 
{
	@RequestMapping("/")
	public String showHome(Model model,HttpSession session)
	{
		List<String> messages = (List<String>) session.getAttribute("MY_SESSION_MESSAGES");
		if (messages == null) 
		{
			messages = new ArrayList<>();
			for(int i=0;i<10;i++)
			{
				messages.add(""+i);
			}
		}
		
		model.addAttribute("sessionMessages", messages);
		
		return "Home";		
	}
	

}
