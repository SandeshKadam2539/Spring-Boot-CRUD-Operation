package com.crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crud.exception.UserNotFoundException;
import com.crud.model.User;
import com.crud.repository.UserRepository;


@RestController
@CrossOrigin(origins = "http://localhost:3000") // Ensure correct frontend URL
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Create a new user
    @PostMapping("/user")
    public User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    // Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    //Get perticular id
    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id)
    {
		return userRepository.findById(id)
				.orElseThrow(()->new UserNotFoundException(id));
    }
    
    //create a user id
    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser,@PathVariable Long id)
    {
    	return userRepository.findById(id)
    			.map(User->{
    				User.setName(newUser.getName());
    				User.setUsername(newUser.getUsername());
    				User.setEmail(newUser.getEmail());
    				return userRepository.save(User);
    			}).orElseThrow(()->new UserNotFoundException(id));
    }
    
    //delete the id
    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id)
    {
    	if(!userRepository.existsById(id)) 
    	{
    		throw new UserNotFoundException(id);
    	}
    	userRepository.deleteById(id);
    	return "User with id "+id+" has been deleted success.";
    }
    
    
}

















