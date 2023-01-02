package docSharing.Entities;

public class DirectoryBody {
    Long id;
    String name;

    public DirectoryBody() {
    }

    public DirectoryBody(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "DirectoryBody{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}