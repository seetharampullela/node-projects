import React, { useEffect } from "react";
import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SimpleGrid } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { ProductCard } from "../components/ProductCard";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"xl"} py={12}>
      <VStack spaceX={8}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
        >
          Current Product 🚀
        </Text>

        {products?.length === 0 ? (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found. 😥{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                {" "}
                Create Product
              </Text>
            </Link>
          </Text>
        ) : (
          <SimpleGrid
            columns={{ base: 2, md: 2, lg: 3 }}
            spacing={10}
            w={"full"}
          >
            {products?.map((product) => {
              return <ProductCard product={product} key={product._id} />;
            })}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;
