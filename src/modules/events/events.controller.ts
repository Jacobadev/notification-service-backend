import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Event } from './entities/event.entity';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully created.',
    type: Event,
  })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all events' })
  @ApiResponse({
    status: 200,
    description: 'A list of all events.',
    type: [Event],
  })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a single event by ID' })
  @ApiResponse({
    status: 200,
    description: 'The event with the specified ID.',
    type: Event,
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the event to retrieve.',
    type: String,
  })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully updated.',
    type: Event,
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the event to update.',
    type: String,
  })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the event to delete.',
    type: String,
  })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
