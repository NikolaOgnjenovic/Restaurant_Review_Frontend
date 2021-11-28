package io.github.com.pavleprica.hzs.template.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {

    @Bean
    Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors
                        .basePackage("io.github.com.pavleprica.hzs.template.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiEndpointsInfo());
    }

    private ApiInfo apiEndpointsInfo() {
        return new ApiInfoBuilder()
                .title("HZS Hackathon - FONIS")
                .contact(new Contact("Pavle Prica", "https://github.com/pavleprica", "pavle.prica@zuehlke.com"))
                .version("0.0.1")
                .build();
    }

}
