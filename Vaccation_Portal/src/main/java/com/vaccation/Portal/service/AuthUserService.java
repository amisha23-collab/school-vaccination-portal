package com.vaccation.Portal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.vaccation.Portal.entity.Users;
import com.vaccation.Portal.repository.UsersRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthUserService implements UserDetailsService {

	@Autowired
    private  UsersRepository myAppUserRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    Users user = myAppUserRepository.findByUsername(username)
	        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
	    return User.builder()
	        .username(user.getUsername())
	        .password(user.getPassword())
	        .roles(user.getRole()) // using the role from DB
	        .build();
	}

}
