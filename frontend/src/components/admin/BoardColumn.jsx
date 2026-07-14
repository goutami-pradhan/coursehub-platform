import { Droppable } from "@hello-pangea/dnd";
import EnrollmentCard from "./EnrollmentCard";

const BoardColumn = ({
    title,
    status,
    enrollments,
    loadEnrollments
}) => {

    const filtered = enrollments.filter(
        e => e.status === status
    );

    return (

        <Droppable droppableId={status}>

            {(provided) => (

                <div
                    className="board-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >

                  <h3>
    {title} ({filtered.length})
</h3>

                    {

                        filtered.map((enrollment, index) => (

                            <EnrollmentCard

                                key={enrollment._id}

                                enrollment={enrollment}

                                index={index}

                                loadEnrollments={loadEnrollments}

                            />

                        ))

                    }

                    {provided.placeholder}

                </div>

            )}

        </Droppable>

    );

};

export default BoardColumn;