/**
 * Configuration class for setting up WebSocket message broker in the application.
 * This class enables WebSocket message handling, including setting up STOMP endpoints
 * and configuring the message broker.
 */
package com.chat.poc.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * The WebSocketConfig class implements WebSocketMessageBrokerConfigurer to customize
 * the WebSocket message handling, including configuring the message broker and defining
 * STOMP endpoints for WebSocket communication.
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Configures the message broker to handle messages for specific destinations.
     * 
     * @param config the MessageBrokerRegistry to be configured.
     *               Enables a simple in-memory broker for topics and sets the prefix
     *               for messages bound for application-annotated methods.
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    /**
     * Registers STOMP endpoints that clients will use to connect to the WebSocket server.
     * The endpoint "/chat" is defined, allowing SockJS as a fallback option for browsers
     * that do not support WebSocket.
     * 
     * @param registry the StompEndpointRegistry to be configured.
     *                 Adds the "/chat" endpoint with allowed origins set to localhost (port 4200),
     *                 and enables SockJS for fallback.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")
            .setAllowedOrigins("http://localhost:4200")
            .withSockJS();
    }
}
