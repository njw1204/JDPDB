-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- animals_user Table Create SQL
CREATE TABLE animals_user
(
    `id`        INT             NOT NULL    AUTO_INCREMENT, 
    `nickname`  VARCHAR(100)    NOT NULL, 
    `password`  VARCHAR(100)    NOT NULL, 
    `email`     VARCHAR(500)    NOT NULL, 
    `point`     INT             NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE animals_user
    ADD CONSTRAINT UC_nickname UNIQUE (nickname);

ALTER TABLE animals_user
    ADD CONSTRAINT UC_email UNIQUE (email);


-- animals_user Table Create SQL
CREATE TABLE animals_file
(
    `id`   INT     NOT NULL    AUTO_INCREMENT, 
    `url`  TEXT    NOT NULL, 
    PRIMARY KEY (id)
);


-- animals_user Table Create SQL
CREATE TABLE animals_category
(
    `id`    INT             NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(100)    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE animals_category
    ADD CONSTRAINT UC_name UNIQUE (name);


-- animals_user Table Create SQL
CREATE TABLE animals_page
(
    `id`               INT             NOT NULL    AUTO_INCREMENT, 
    `creator_id`       INT             NOT NULL, 
    `animal_name`      VARCHAR(100)    NOT NULL, 
    `description`      TEXT            NOT NULL, 
    `category`         INT             NOT NULL, 
    `profile_picture`  INT             NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE animals_page
    ADD CONSTRAINT FK_animals_page_creator_id_animals_user_id FOREIGN KEY (creator_id)
        REFERENCES animals_user (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_page
    ADD CONSTRAINT FK_animals_page_profile_picture_animals_file_id FOREIGN KEY (profile_picture)
        REFERENCES animals_file (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_page
    ADD CONSTRAINT FK_animals_page_category_animals_category_id FOREIGN KEY (category)
        REFERENCES animals_category (id) ON DELETE CASCADE ON UPDATE CASCADE;


-- animals_user Table Create SQL
CREATE TABLE animals_post
(
    `id`               INT              NOT NULL    AUTO_INCREMENT, 
    `page_id`          INT              NOT NULL, 
    `title`            VARCHAR(200)     NOT NULL, 
    `content`          VARCHAR(1000)    NOT NULL, 
    `created_time`     DATETIME         NOT NULL    DEFAULT    CURRENT_TIMESTAMP, 
    `min_class_level`  INT              NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE animals_post
    ADD CONSTRAINT FK_animals_post_page_id_animals_page_id FOREIGN KEY (page_id)
        REFERENCES animals_page (id) ON DELETE CASCADE ON UPDATE CASCADE;


-- animals_user Table Create SQL
CREATE TABLE animals_product
(
    `id`           INT             NOT NULL    AUTO_INCREMENT, 
    `name`         VARCHAR(100)    NOT NULL, 
    `description`  TEXT            NOT NULL, 
    `cost`         INT             NOT NULL, 
    PRIMARY KEY (id)
);


-- animals_user Table Create SQL
CREATE TABLE animals_tag
(
    `id`    INT            NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(50)    NOT NULL, 
    PRIMARY KEY (id)
);


-- animals_user Table Create SQL
CREATE TABLE animals_comment
(
    `id`            INT             NOT NULL    AUTO_INCREMENT, 
    `user_id`       INT             NOT NULL    COMMENT '복합 유니크', 
    `post_id`       INT             NOT NULL    COMMENT '복합 유니크', 
    `content`       VARCHAR(500)    NOT NULL, 
    `created_time`  DATETIME        NOT NULL    DEFAULT    CURRENT_TIMESTAMP, 
    PRIMARY KEY (id)
);

ALTER TABLE animals_comment
    ADD CONSTRAINT FK_animals_comment_post_id_animals_post_id FOREIGN KEY (post_id)
        REFERENCES animals_post (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_comment
    ADD CONSTRAINT FK_animals_comment_user_id_animals_user_id FOREIGN KEY (user_id)
        REFERENCES animals_user (id) ON DELETE CASCADE ON UPDATE CASCADE;


-- animals_user Table Create SQL
CREATE TABLE animals_post_files
(
    `id`       INT    NOT NULL    AUTO_INCREMENT, 
    `post_id`  INT    NOT NULL    COMMENT '복합 유니크', 
    `file_id`  INT    NOT NULL    COMMENT '복합 유니크', 
    PRIMARY KEY (id)
);

ALTER TABLE animals_post_files
    ADD CONSTRAINT FK_animals_post_files_post_id_animals_post_id FOREIGN KEY (post_id)
        REFERENCES animals_post (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_post_files
    ADD CONSTRAINT FK_animals_post_files_file_id_animals_file_id FOREIGN KEY (file_id)
        REFERENCES animals_file (id) ON DELETE CASCADE ON UPDATE CASCADE;


-- animals_user Table Create SQL
CREATE TABLE animals_product_pictures
(
    `id`          INT    NOT NULL    AUTO_INCREMENT, 
    `product_id`  INT    NOT NULL    COMMENT '복합 유니크', 
    `file_id`     INT    NOT NULL    COMMENT '복합 유니크', 
    PRIMARY KEY (id)
);

ALTER TABLE animals_product_pictures
    ADD CONSTRAINT FK_animals_product_pictures_file_id_animals_file_id FOREIGN KEY (file_id)
        REFERENCES animals_file (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_product_pictures
    ADD CONSTRAINT FK_animals_product_pictures_product_id_animals_product_id FOREIGN KEY (product_id)
        REFERENCES animals_product (id) ON DELETE CASCADE ON UPDATE CASCADE;


-- animals_user Table Create SQL
CREATE TABLE animals_post_tags
(
    `id`       INT    NOT NULL    AUTO_INCREMENT, 
    `post_id`  INT    NOT NULL    COMMENT '복합 유니크', 
    `tag_id`   INT    NOT NULL    COMMENT '복합 유니크', 
    PRIMARY KEY (id)
);

ALTER TABLE animals_post_tags
    ADD CONSTRAINT FK_animals_post_tags_post_id_animals_post_id FOREIGN KEY (post_id)
        REFERENCES animals_post (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_post_tags
    ADD CONSTRAINT FK_animals_post_tags_tag_id_animals_tag_id FOREIGN KEY (tag_id)
        REFERENCES animals_tag (id) ON DELETE CASCADE ON UPDATE CASCADE;


-- animals_user Table Create SQL
CREATE TABLE animals_donate_product
(
    `id`             INT     NOT NULL    AUTO_INCREMENT, 
    `from_user_id`   INT     NOT NULL, 
    `to_page_id`     INT     NOT NULL, 
    `product_id`     INT     NOT NULL, 
    `product_count`  INT     NOT NULL, 
    `message`        TEXT    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE animals_donate_product
    ADD CONSTRAINT FK_animals_donate_product_from_user_id_animals_user_id FOREIGN KEY (from_user_id)
        REFERENCES animals_user (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_donate_product
    ADD CONSTRAINT FK_animals_donate_product_product_id_animals_product_id FOREIGN KEY (product_id)
        REFERENCES animals_product (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_donate_product
    ADD CONSTRAINT FK_animals_donate_product_to_page_id_animals_page_id FOREIGN KEY (to_page_id)
        REFERENCES animals_page (id) ON DELETE CASCADE ON UPDATE CASCADE;


-- animals_user Table Create SQL
CREATE TABLE animals_donate_money
(
    `id`            INT     NOT NULL    AUTO_INCREMENT, 
    `from_user_id`  INT     NOT NULL, 
    `to_page_id`    INT     NOT NULL, 
    `cost`          INT     NOT NULL, 
    `message`       TEXT    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE animals_donate_money
    ADD CONSTRAINT FK_animals_donate_money_from_user_id_animals_user_id FOREIGN KEY (from_user_id)
        REFERENCES animals_user (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_donate_money
    ADD CONSTRAINT FK_animals_donate_money_to_page_id_animals_page_id FOREIGN KEY (to_page_id)
        REFERENCES animals_page (id) ON DELETE CASCADE ON UPDATE CASCADE;


-- animals_user Table Create SQL
CREATE TABLE animals_required_products
(
    `id`             INT    NOT NULL    AUTO_INCREMENT, 
    `page_id`        INT    NOT NULL    COMMENT '복합 유니크', 
    `product_id`     INT    NOT NULL    COMMENT '복합 유니크', 
    `product_count`  INT    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE animals_required_products
    ADD CONSTRAINT FK_animals_required_products_page_id_animals_page_id FOREIGN KEY (page_id)
        REFERENCES animals_page (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_required_products
    ADD CONSTRAINT FK_animals_required_products_product_id_animals_product_id FOREIGN KEY (product_id)
        REFERENCES animals_product (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_required_products
    ADD CONSTRAINT UC_product_id UNIQUE (product_id);


-- animals_user Table Create SQL
CREATE TABLE animals_page_donate_class
(
    `id`                  INT             NOT NULL    AUTO_INCREMENT, 
    `page_id`             INT             NOT NULL, 
    `cost`                INT             NOT NULL, 
    `class_name`          VARCHAR(100)    NOT NULL, 
    `class_level`         INT             NOT NULL, 
    `reward_description`  TEXT            NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE animals_page_donate_class
    ADD CONSTRAINT FK_animals_page_donate_class_page_id_animals_page_id FOREIGN KEY (page_id)
        REFERENCES animals_page (id) ON DELETE CASCADE ON UPDATE CASCADE;


-- animals_user Table Create SQL
CREATE TABLE animals_user_to_page_info
(
    `id`            INT           NOT NULL    AUTO_INCREMENT, 
    `user_id`       INT           NOT NULL    COMMENT '복합 유니크', 
    `page_id`       INT           NOT NULL    COMMENT '복합 유니크', 
    `total_donate`  INT           NOT NULL, 
    `subscribe`     TINYINT(1)    NOT NULL, 
    `class_level`   INT           NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE animals_user_to_page_info
    ADD CONSTRAINT FK_animals_user_to_page_info_user_id_animals_user_id FOREIGN KEY (user_id)
        REFERENCES animals_user (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE animals_user_to_page_info
    ADD CONSTRAINT FK_animals_user_to_page_info_page_id_animals_page_id FOREIGN KEY (page_id)
        REFERENCES animals_page (id) ON DELETE CASCADE ON UPDATE CASCADE;


