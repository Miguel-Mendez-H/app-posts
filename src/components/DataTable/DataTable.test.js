import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "@/components/DataTable/DataTable";

const mockData = [
  { id: 1, title: "Post 1", body: "Description 1" },
  { id: 2, title: "Post 2", body: "Description 2" },
];

const mockColumns = [
  { label: "ID", accessor: "id" },
  { label: "Título", accessor: "title" },
  { label: "Descripción", accessor: "body" },
];

test("renders data in the table", () => {
  render(<DataTable data={mockData} columns={mockColumns} />);
  
  expect(screen.getByText("ID")).toBeInTheDocument();
  expect(screen.getByText("Título")).toBeInTheDocument();
  expect(screen.getByText("Descripción")).toBeInTheDocument();

  // Verificar que los datos están presentes en la tabla
  expect(screen.getByText("Post 1")).toBeInTheDocument();
  expect(screen.getByText("Post 2")).toBeInTheDocument();
});


test("handles page change", () => {
    render(<DataTable data={mockData} columns={mockColumns} initialItemsPerPage={1} />);
    
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText("Next Page"));
    
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  
  test("calls onEdit and onDelete", () => {
    const onEditMock = jest.fn();
    const onDeleteMock = jest.fn();
  
    render(<DataTable data={mockData} columns={mockColumns} onEdit={onEditMock} onDelete={onDeleteMock} />);
  
    fireEvent.click(screen.getByLabelText("Edit Post 1"));
    expect(onEditMock).toHaveBeenCalledWith(1);
  
    fireEvent.click(screen.getByLabelText("Delete Post 1"));
    expect(onDeleteMock).toHaveBeenCalledWith(1);
  });
  

  test("handles items per page change", () => {
    const data = [
        { id: 1, title: "Post 1", description: "Description 1" },
        { id: 2, title: "Post 2", description: "Description 2" },
      ];
    
      const columns = [
        { label: "ID", accessor: "id" },
        { label: "Título", accessor: "title" },
        { label: "Descripción", accessor: "description" },
      ];
    
      const handleDelete = jest.fn();
      const handleEdit = jest.fn();
    
      render(
        <DataTable
          data={data}
          columns={columns}
          initialItemsPerPage={5}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      );
    
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
    
      const itemsPerPageSelect = screen.getByLabelText("Items por página:");
      fireEvent.change(itemsPerPageSelect, { target: { value: "10" } });
    
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
  });
  

  
  test("handles pagination buttons correctly", () => {
    render(<DataTable data={mockData} columns={mockColumns} initialItemsPerPage={1} />);
  
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText("Next Page"));

    expect(screen.getByText("Post 2")).toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText("Previous Page"));
    // Verificar que el primer post se muestra de nuevo
    expect(screen.getByText("Post 1")).toBeInTheDocument();
  });

  test("calls onEdit and onDelete for different items", () => {
    const onEditMock = jest.fn();
    const onDeleteMock = jest.fn();
    
    render(<DataTable data={mockData} columns={mockColumns} onEdit={onEditMock} onDelete={onDeleteMock} />);
  
    // Simular clic en el botón de editar para el primer post
    fireEvent.click(screen.getByLabelText("Edit Post 1"));
    expect(onEditMock).toHaveBeenCalledWith(1);
  
    // Simular clic en el botón de eliminar para el primer post
    fireEvent.click(screen.getByLabelText("Delete Post 1"));
    expect(onDeleteMock).toHaveBeenCalledWith(1);
  
    // Simular clic en el botón de editar para el segundo post
    fireEvent.click(screen.getByLabelText("Edit Post 2"));
    expect(onEditMock).toHaveBeenCalledWith(2);
  
    // Simular clic en el botón de eliminar para el segundo post
    fireEvent.click(screen.getByLabelText("Delete Post 2"));
    expect(onDeleteMock).toHaveBeenCalledWith(2);
  });
  