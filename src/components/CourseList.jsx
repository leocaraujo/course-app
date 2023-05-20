import { useEffect, useState } from "react";
import supabase from "../lib/supabase"; // assuming you have the supabase.js client in a 'lib' folder

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the courses data from Supabase
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("cursos").select(`
        *,
        categorias(*)
        `);
      console.log(data);
      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Course List</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h2>{course.titulo}</h2>
            <p>{course.descricao}</p>
            <p>Categoria: {course.categorias.nome}</p>
            <p>Preço: R$ {course.preco}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
