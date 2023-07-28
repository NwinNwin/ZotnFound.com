import { React, useState } from "react";
import { Button, Text, Flex, Stack, Icon, Image } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import logo from "../../assets/images/small_logo.png";
import login_page from "../../assets/images/login_page.jpg";
import map from "../../assets/images/map.jpg";

export default function AboutPage() {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  window.onresize = () => {
    setScreenWidth(window.screen.width);
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Flex
      alignItems={"center"}
      direction={"column"}
      height={"auto"}
      paddingTop={"1em"}
      gap={"1em"}
      width={"auto"}
      className="parent"
      overflowX={"hidden"}
    >
      <Stack
        direction={{ base: "column", md: "column", lg: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100vw"}
      >
        <Flex display={screenWidth < 992 ? "none" : "block"} marginLeft={10}>
          <Button onClick={handleClick} visibility={"hidden"}>
            <Icon as={ArrowBackIcon} marginRight={"2%"} />
            Return Home{" "}
          </Button>
        </Flex>
        <Text fontSize={{ base: "2rem", md: "3rem" }} as="b" width={"10em"}>
          We are ZotnFound
        </Text>
        <Flex>
          <Button onClick={handleClick} marginRight={{ lg: 10 }}>
            <Icon as={ArrowBackIcon} marginRight={"2%"} />
            Return Home{" "}
          </Button>
        </Flex>
      </Stack>
      <Text
        fontSize={{ base: "1rem", md: "1.5rem" }}
        width={{ base: "20em", md: "40em" }}
      >
        insert bio Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
        quae distinctio corporis officiis neque incidunt placeat, doloribus
        minus atque qui in accusamus architecto quidem excepturi maxime
        reiciendis, harum est sequi?
      </Text>
      <Flex
        direction={"row"}
        justifyContent="center"
        alignItems={"center"}
        gap={"1em"}
        width={"100vw"}
        bg={"#fffcf6"}
        mt={"1%"}
        mb={"1%"}
      >
        <Flex direction={"column"} m={"1%"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "2.4rem" }}>
            0
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Lost Items</Text>
        </Flex>
        <Flex direction={"column"} m={"1%"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "2.4rem" }}>
            0
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Found Items</Text>
        </Flex>
        <Flex direction={"column"} m={"1%"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "2.4rem" }}>
            0
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>
            Successful Returns
          </Text>
        </Flex>
        <Flex direction={"column"} m={"1%"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "2.4rem" }}>
            0
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Active Users</Text>
        </Flex>
      </Flex>
      <Flex
        w="80vw"
        flexWrap={{ base: "none", md: "wrap" }}
        justifyContent={"space-between"}
        direction={{ base: "column", md: "row" }}
        h="100%"
      >
        <Flex
          flexBasis={"50%"}
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
        >
          <Text fontWeight={500} fontSize={{ base: "1.3rem", md: "1.6rem" }}>
            What makes ZotnFound special?
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1rem" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint,
            omnis libero nostrum sunt laboriosam praesentium modi eveniet alias
            est quos pariatur, odio ab quod excepturi delectus vel quis illo
            atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugit beatae ratione assumenda illum laudantium quod maiores nisi,
            cumque corrupti cupiditate earum eum soluta placeat autem veniam!
            Vel neque iusto impedit!
          </Text>
        </Flex>
        <Flex flexBasis={"50%"} justifyContent={"center"} alignItems={"center"}>
          <Image src={logo} w="15em" h="15em" />
        </Flex>
        <Flex
          flexBasis={"50%"}
          justifyContent={"center"}
          alignItems={"center"}
          display={{ base: "none", md: "block" }}
        >
          <Image src={logo} w="15em" h="15em" />
        </Flex>
        <Flex
          flexBasis={"50%"}
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
        >
          <Text fontWeight={500} fontSize={{ base: "1.3rem", md: "1.6rem" }}>
            How did ZotnFound start?
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1rem" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint,
            omnis libero nostrum sunt laboriosam praesentium modi eveniet alias
            est quos pariatur, odio ab quod excepturi delectus vel quis illo
            atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugit beatae ratione assumenda illum laudantium quod maiores nisi,
            cumque corrupti cupiditate earum eum soluta placeat autem veniam!
            Vel neque iusto impedit!
          </Text>
        </Flex>
        <Flex
          flexBasis={"50%"}
          justifyContent={"center"}
          alignItems={"center"}
          display={{ base: "block", md: "none" }}
        >
          <Image src={logo} w="15em" h="15em" />
        </Flex>
      </Flex>
      <Flex
        flexBasis={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        bg={"#fffcf6"}
        w="100vw"
      >
        <Text
          fontWeight={500}
          fontSize={{ base: "1.3rem", md: "1.6rem" }}
          mb={"1%"}
          mt={"1%"}
        >
          Explore how ZotnFound works
        </Text>
        <Flex width={"60em"} height={"40em"}>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
          >
            <SwiperSlide>
              <Flex
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={login_page} />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "1.3rem", md: "1.6rem" }}
                  mt={"2%"}
                >
                  Get Started - It's Simple & Easy
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  mt={"2%"}
                  maxW={"40em"}
                >
                  Log in with your UCI email and start listing lost & found
                  items! {"(No need to sign up or create an account)."}
                </Text>
              </Flex>
            </SwiperSlide>
            <SwiperSlide>
              <Flex
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={login_page} />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "1.3rem", md: "1.6rem" }}
                  mt={"2%"}
                >
                  Navigate Around the Map
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  mt={"2%"}
                  maxW={"40em"}
                >
                  Effortlessly navigate UCI's interactive map to efficiently
                  search for lost and found items. Explore the digital landscape
                  with ease as you locate and reclaim belongings!
                </Text>
              </Flex>
            </SwiperSlide>
            <SwiperSlide>
              <Flex
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={login_page} />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "1.3rem", md: "1.6rem" }}
                  mt={"2%"}
                >
                  Search for Lost & Found Items
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  mt={"2%"}
                  maxW={"40em"}
                >
                  Utilize the easy to use filter and search bar to look up
                  specific items based off their name, description, type, or the
                  time estimate of when the item was lost/found.
                </Text>
              </Flex>
            </SwiperSlide>
            <SwiperSlide>
              <Flex
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={login_page} />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "1.3rem", md: "1.6rem" }}
                  mt={"2%"}
                >
                  Upload Your Items - Join the Community!
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  mt={"2%"}
                  maxW={"40em"}
                >
                  Show off the different items that you may have found or lost.
                  Participate in helping return items back to the community and
                  stay on a lookout for any items that may be yours!
                </Text>
              </Flex>
            </SwiperSlide>
            <SwiperSlide>
              <Flex
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={login_page} />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "1.3rem", md: "1.6rem" }}
                  mt={"2%"}
                >
                  Contact Others and Connect
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  mt={"2%"}
                  maxW={"40em"}
                >
                  Meet people in the community and create new friends! Easily
                  contact people who may have found your items and vice versa.
                </Text>
              </Flex>
            </SwiperSlide>
          </Swiper>
        </Flex>
      </Flex>
      <Flex
        flexBasis={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
      >
        <Text fontWeight={500} fontSize={{ base: "1.3rem", md: "1.6rem" }}>
          Community Guidelines
        </Text>
        <Text fontSize={{ base: "0.8rem", md: "1rem" }} maxW={"80em"}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
          quibusdam sit nihil consectetur optio. Delectus ullam distinctio illo,
          odio qui excepturi minima ab officiis dolores libero aliquam eum natus
          provident. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Consectetur aliquid explicabo ad doloremque maxime est molestiae alias
          veritatis animi magni pariatur, vel architecto facilis laboriosam
          facere iusto eum ea quo.
        </Text>
      </Flex>
      <Stack height={"50"}>
        <Text>Footer</Text>
      </Stack>
    </Flex>
  );
}
