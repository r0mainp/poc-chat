/**
 * Controller class for handling WebSocket messages related to chat functionality.
 * This class listens for incoming chat messages and broadcasts them to subscribed clients.
 */
package com.chat.poc.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.chat.poc.model.ChatMessage;

/**
 * The ChatController class is responsible for managing chat messages received from clients.
 * It maps incoming messages to a specific destination and broadcasts them to the appropriate topic.
 */
@Controller
public class ChatController {

    /**
     * Handles incoming chat messages from clients.
     * 
     * @param message the ChatMessage object sent by the client.
     * @return the same ChatMessage object to be sent to all subscribers of the "/topic/messages" destination.
     */
    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
        return message;
    }
}